// редирект на DonationAlerts OAuth

const CLIENT_ID = "ТВОЙ_CLIENT_ID";
const REDIRECT_URI = "https://siteodsotik.vercel.app/api/callback";

export default function Auth() {
  return null;
}

export async function getServerSideProps({ res }) {
  const scope = [
    "oauth-donation-index",
    "oauth-user-show"
  ].join(" ");

  const url =
    "https://www.donationalerts.com/oauth/authorize" +
    `?client_id=${encodeURIComponent(CLIENT_ID)}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&response_type=code` +
    `&scope=${encodeURIComponent(scope)}`;

  res.writeHead(302, { Location: url });
  res.end();

  return { props: {} };
}
