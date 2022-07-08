import type { InferGetServerSidePropsType, NextPage } from 'next';
import { GetServerSidePropsContext } from 'next';
import styles from '../styles/Home.module.css';
import { Button, ButtonArrow, H1, Paragraph } from 'govuk-react';
import { getSession } from '../lib/session/memory';

const Home: NextPage = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) =>
  <>
    <H1>HMCTS Next.js Prototype</H1>
    <Paragraph children={'Welcome to the HMCTS Next.js Prototype, ' + user.email}/>
    <Paragraph>Run with:</Paragraph>
    <Paragraph className={styles.code}>yarn dev</Paragraph>
    <Paragraph>Press Start now to continue with the prototype</Paragraph>
    <form action={'/page1'} method={'POST'}>
      <Button icon={<ButtonArrow/>} start>
        Start now
      </Button>
    </form>
    <Paragraph>
      [Save and sign out](/logout)
    </Paragraph>
  </>;

export const getServerSideProps = async function ({ req, res }: GetServerSidePropsContext) {
  const { user } = await getSession(req, res);

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    };
  }

  return {
    props: { user }
  };
};

export default Home;
