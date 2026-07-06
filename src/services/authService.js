import { getSupabaseClient } from "../lib/supabase";

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function assertEmail(email) {
  if (!normalizeEmail(email)) {
    throw new Error("Enter an email address.");
  }
}

function assertSignInCredentials(email, password) {
  assertEmail(email);

  if (!password) {
    throw new Error("Enter your password.");
  }
}

function assertSignUpCredentials(email, password) {
  assertEmail(email);

  if (!password || password.length < 6) {
    throw new Error("Password must be at least 6 characters.");
  }
}

export async function signUp(email, password, metadata = {}) {
  assertSignUpCredentials(email, password);

  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email: normalizeEmail(email),
    password,
    options: { data: metadata }
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signIn(email, password) {
  assertSignInCredentials(email, password);

  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: normalizeEmail(email),
    password
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signOut() {
  const supabase = getSupabaseClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function getSession() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new Error(error.message);
  }

  return data.session;
}

export function onAuthStateChange(callback) {
  const supabase = getSupabaseClient();
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    callback(session, event);
  });

  return data.subscription;
}
