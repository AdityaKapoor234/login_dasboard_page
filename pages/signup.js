import Head from 'next/head'
import {APP_NAME} from "../utils/constant";
import AuthLayoutComponent from "../component/layouts/auth-layout/auth-layout";
import SignUp from '../component/signup/signup';

export default function Home() {

  return (
    <div>
      <Head>
        <title>{APP_NAME} - signup</title>
      </Head>

      <main>
      <AuthLayoutComponent image={"/images/login-otp.png"}>
        <div className='row justify-content-center margin-login '>
          <div className='col-8 p-0 '>
            <SignUp />
          </div>
        </div>
      </AuthLayoutComponent>
      </main>

      
    </div>
  )
}
