import { Button, ErrorSummary, Fieldset, H1, InputField } from 'govuk-react';
import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';
import { parseBody } from 'next/dist/server/api-utils/node';
import { getSession } from '../lib/session/memory';

const Login: NextPage = ({ errors }: InferGetServerSidePropsType<typeof getServerSideProps>) =>
  <>
    <H1>HMCTS Next.js Prototype</H1>
    {errors && <ErrorSummary
      description="It's possible your username and password were incorrect"
      errors={[
        {
          targetName: 'username',
          text: 'Username error'
        },
        {
          targetName: 'password',
          text: 'Password errors'
        }
      ]}
      heading="There was a problem logging you in"
    />
    }
    <form action={''} method={'POST'}>
      <Fieldset mb={6}>
        <Fieldset.Legend size="M">Log in</Fieldset.Legend>
        <InputField mb={4} input={{name: 'username'}}>
          Username
        </InputField>
        <InputField input={{name: 'password', type: 'password'}}>
          Password
        </InputField>
      </Fieldset>
      <Button>Log in</Button>
    </form>
  </>;

export const getServerSideProps = async function ({ req, res }: GetServerSidePropsContext) {
  if (req.method !== 'POST') {
    return { props: {} };
  }

  const body = await parseBody(req, '1mb');
  const errors = body.username !== 'admin' || body.password !== 'password';

  if (!errors) {
    const session = await getSession(req, res);
    session.user = {
      email: body.username,
      name: body.username
    };
    await session.commit();

    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { errors },
  };
};

export default Login;
