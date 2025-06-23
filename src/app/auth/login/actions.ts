'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';
import { APP_DASHBOARD } from '@/constants';

export async function loginAction(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error?.code === 'invalid_credentials') {
    return { error: 'Email dan password salah Periksa Kembali Email dan Password Anda' };
  } else if (error) {
    return { error: 'Terjadi kesalahan saat login, silakan coba lagi!' };
  }

  revalidatePath(APP_DASHBOARD, 'layout');
  redirect(APP_DASHBOARD);
}
