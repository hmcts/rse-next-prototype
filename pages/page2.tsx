import type { NextPage } from 'next';
import { GetServerSidePropsContext } from 'next';
import { Button, DateField, H1, Paragraph } from 'govuk-react';
import { getSession } from '../lib/session/memory';
import { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../styles/Page2.module.css';

const Page2: NextPage = () => {
  const [useNoJsPicker, setUseNoJsPicker] = useState(true);

  useEffect(() => {
    setUseNoJsPicker(false);
  }, []);

  const [startDate, setStartDate] = useState(new Date());

  const DatePicker = useNoJsPicker
    ? <DateField input={{ onBlur: function noRefCheck(){}, onChange: function noRefCheck(){}, onFocus: function noRefCheck(){} }} inputNames={{ day: 'dayInputName' }}>What is your date of birth?</DateField>
    : <ReactDatePicker className={styles.picker} selected={startDate} onChange={(date:Date) => setStartDate(date)} />;

  return <>
    <H1>HMCTS Next.js Prototype</H1>
    <form action={'/page2'} method={'POST'}>
      { DatePicker }
      <Button>Continue</Button>
    </form>
    <Paragraph>
      [Save and sign out](/logout)
    </Paragraph>
  </>;
};

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

export default Page2;
