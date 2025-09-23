import nodemailer from "nodemailer";

// const token = process.env.MAILTRAP_TOKEN;
const user = process.env.MAILTRAP_USER;
const pass = process.env.MAILTRAP_PASS;
const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user,
    pass,
  },
});

const html = (confirmUrl: string) => `
  <!DOCTYPE html>
  <html>
  <head>
    <attributes>
      <text font-family="Ubuntu, Helvetica, Arial, sans-serif" padding="0 25px" font-size="13px"></text>
      <section background-color="#ffffff"></section>
      <class name="preheader" color="#000000" font-size="11px"></class>
    </attributes>
    <style inline="inline">a { text-decoration: none!important; color: inherit!important; }</style>
  </head>
  <body background-color="#bedae6">
    <section>
      <column width="100%">
        <image src="https://shadcn-vue-landing-page.vercel.app/hero-image-dark.jpg" alt="header image" padding="0px"></image>
      </column>
    </section>
    <section padding-bottom="20px" padding-top="10px">
      <column>
        <text align="center" padding="10px 25px" font-size="20px" color="#512d0b"><strong>Hey new user!</strong></text>
        <text align="center" font-size="18px" font-family="Arial">Welcome to LogTravel<br /> The base Nuxt 4 project template</text>
        <text align="center" color="#489BDA" font-size="25px" font-family="Arial, sans-serif" font-weight="bold" line-height="35px" padding-top="20px">
          Thank you for signing up!<br />
          <span style="font-size:18px">Get started with LogTravel</span>
        </text>
        <button background-color="#8bb420" color="#FFFFFF" href="${confirmUrl}" target="_blank" align="center" font-family="Arial, sans-serif" padding="20px 0 0 0" font-weight="bold" font-size="16px">
          Verify Your Email Now!
        </button>
        <text align="center" color="#000000" font-size="14px" font-family="Arial, sans-serif" padding-top="40px">Best, <br /> The LogTravel Team
          <p></p>
        </text>
      </column>
    </section>
  </body>
</html>
`;

export default async function sendEmail(to: string, token: string) {
  const url = process.env.BASE_URL + "/auth/verify?token=" + token;
  console.log(url);
  await transport.sendMail({
    from: "LogTravel <onboarding@resend.dev>",
    to,
    subject: "Verify your email address",
    html: html(url),
  });
}
