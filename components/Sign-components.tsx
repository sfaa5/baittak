import React from 'react'

import SignOut from './SignOut';
import SignInWithGoogle from './SignInWithGoogle';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextAuth';
async function SignComponents() {
    const session = await getServerSession(authOptions);

  return (
    <>
    {session ? <SignOut user={session?.user} /> : <SignInWithGoogle />}
    </>
  )
}

export default SignComponents