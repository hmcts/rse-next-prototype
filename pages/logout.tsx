import { GetServerSidePropsContext, NextPage } from 'next';
import { getSession } from '../lib/session/memory';

const Logout: NextPage = () => {
  return <></>;
};

export const getServerSideProps = async function ({ req, res }: GetServerSidePropsContext) {
  const session = await getSession(req, res);
  await session.destroy();

  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
};

export default Logout;
