import { Link, Page, PhaseBanner } from 'govuk-react';

export default function Layout({ children }: any) {
  return <>
    <Page beforeChildren={<PhaseBanner level="beta">
      This part of GOV.UK is being rebuilt –{' '}
      <Link href="https://example.com">
        find out what that means
      </Link>.
    </PhaseBanner>}>
      {children}
    </Page>
  </>;
}
