// import supabaseClient, { supabaseUrl } from "@/utils/supabase";

// // - Apply to job ( candidate )
// export async function applyToJob(token, _, jobData) {
//   const supabase = await supabaseClient(token);

//   const random = Math.floor(Math.random() * 90000);
//   const fileName = `resume-${random}-${jobData.candidate_id}`;

//   const { error: storageError } = await supabase.storage
//     .from("resumes")
//     .upload(fileName, jobData.resume);

//   if (storageError) throw new Error("Error uploading Resume");

//   const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

//   const { data, error } = await supabase
//     .from("applications")
//     .insert([
//       {
//         ...jobData,
//         resume,
//       },
//     ])
//     .select();

//   if (error) {
//     console.error(error);
//     throw new Error("Error submitting Application");
//   }

//   return data;
// }

// // - Edit Application Status ( recruiter )
// export async function updateApplicationStatus(token, { job_id }, status) {
//   const supabase = await supabaseClient(token);
//   const { data, error } = await supabase
//     .from("applications")
//     .update({ status })
//     .eq("job_id", job_id)
//     .select();

//   if (error || data.length === 0) {
//     console.error("Error Updating Application Status:", error);
//     return null;
//   }

//   return data;
// }

// export async function getApplications(token, { user_id }) {
//   const supabase = await supabaseClient(token);
//   const { data, error } = await supabase
//     .from("applications")
//     .select("*, job:jobs(title, company:companies(name))")
//     .eq("candidate_id", user_id);

//   if (error) {
//     console.error("Error fetching Applications:", error);
//     return null;
//   }

//   return data;
// }


import supabaseClient, { supabaseUrl } from "@/utils/supabase";

// Check if a user can apply to a job
export async function canApplyToJob(token, { job_id, user_id }) {
  const supabase = await supabaseClient(token);
  
  // Check if the user is the job creator
  const { data: jobData, error: jobError } = await supabase
    .from("jobs")
    .select("recruiter_id")
    .eq("id", job_id)
    .single();

  if (jobError) {
    console.error("Error fetching job data:", jobError);
    return false;
  }

  if (jobData.recruiter_id === user_id) {
    return false; // User is the job creator, can't apply
  }

  // Check if the user has already applied
  const { data: applicationData, error: applicationError } = await supabase
    .from("applications")
    .select("id")
    .eq("job_id", job_id)
    .eq("candidate_id", user_id)
    .single();

  if (applicationError && applicationError.code !== 'PGRST116') {
    console.error("Error checking application:", applicationError);
    return false;
  }

  return !applicationData; // Can apply if no existing application found
}

// Apply to job (candidate)
export async function applyToJob(token, _, jobData) {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-${random}-${jobData.candidate_id}`;

  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, jobData.resume);

  if (storageError) {
    console.error("Error uploading Resume:", storageError);
    throw new Error("Error uploading Resume");
  }

  const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        ...jobData,
        resume,
      },
    ])
    .select();

  if (error) {
    console.error("Error submitting Application:", error);
    throw new Error("Error submitting Application");
  }

  return data;
}

// Edit Application Status (recruiter)
export async function updateApplicationStatus(token, { job_id }, status) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("applications")
    .update({ status })
    .eq("job_id", job_id)
    .select();

  if (error || data.length === 0) {
    console.error("Error Updating Application Status:", error);
    return null;
  }

  return data;
}

// Get applications for a user
export async function getApplications(token, { user_id }) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("applications")
    .select("*, job:jobs(title, company:companies(name))")
    .eq("candidate_id", user_id);

  if (error) {
    console.error("Error fetching Applications:", error);
    return null;
  }

  return data;
}

// Get job details
export async function getJobDetails(token, { job_id }) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("jobs")
    .select("*, company:companies(name)")
    .eq("id", job_id)
    .single();

  if (error) {
    console.error("Error fetching Job Details:", error);
    return null;
  }

  return data;
}

// Create a new job (recruiter)
export async function createJob(token, jobData) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("jobs")
    .insert([jobData])
    .select();

  if (error) {
    console.error("Error creating Job:", error);
    throw new Error("Error creating Job");
  }

  return data;
}