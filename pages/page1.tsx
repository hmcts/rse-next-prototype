import type { NextPage } from 'next';
import { GetServerSidePropsContext } from 'next';
import { Button, Checkbox, Fieldset, H1, Paragraph, Radio } from 'govuk-react';
import { getSession } from '../lib/session/memory';
import { useEffect, useState } from 'react';

const Page1: NextPage = () => {
  const [isOpen, setIsOpen] = useState('');
  const onClickYes = () => {
    setIsOpen('');
  };
  const onClickNo = () => {
    setIsOpen('hidden');
  };
  useEffect(() => {
    setIsOpen('hidden');
  }, []);

  return <>
    <H1>HMCTS Next.js Prototype</H1>
    <form action={'/page1'} method={'POST'}>
      <Fieldset mb={6}>
        <Fieldset.Legend size="M">Do you like JavaScript</Fieldset.Legend>
        <Radio onClick={onClickYes} inline name="group1">Yes</Radio>
        <Radio onClick={onClickNo} inline name="group1">No</Radio>
      </Fieldset>
      <div className={isOpen}>
        <Fieldset mb={6}>
          <Fieldset.Legend size="M">Do you like TypeScript more?</Fieldset.Legend>
          <Checkbox>Of course!</Checkbox>
        </Fieldset>
      </div>

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

export default Page1;
