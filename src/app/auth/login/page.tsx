import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { APP_DASHBOARD } from '@/constants';
import LeftSection from './components/LeftSection';
import RightSection from './components/RightSection';

export default async function LoginPage() {
  const supabase = await createClient();
  const {data} = await supabase.auth.getUser();

  if (data?.user) {
    redirect(APP_DASHBOARD);
  }
  return ( 
    <div className="flex h-screen">
      <LeftSection/>
      <RightSection/>
    </div>
  ) ;
}
