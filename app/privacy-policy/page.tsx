import Markdown from "react-markdown";
import IndexNavbar from "../index/components/Navbar";
import IndexFooter from "../index/components/Footer";

const PrivacyPolicy = () => {
  return (
    <main className="bg-[#121316]">
      <IndexNavbar />
      <div className="max-w-[1400px] w-full m-auto flex flex-col justify-between my-5">
        <h1 className="text-2xl">Privacy Policy</h1>
      </div>
      <Markdown className="max-w-[1400px] w-full m-auto flex flex-col justify-between my-5 whitespace-pre-line">{`

_Last updated: 2023-06-14_
This Privacy Policy describes how Focusify collects, uses, and discloses information in relation to Focusify.io .

**1. Information We Collect**

When you use our website, we may collect the following types of information:
- **Personal Information:** We collect personal information that you provide to us, such as your name, email address, and any other information you choose to provide.
- **Usage Data:** We collect information about how you use our website, including the time, frequency, and duration of your activities.
- **Device and Technical Data:** We collect technical data about the device you use to access our website, such as your IP address, browser type, and operating system.

**2. How We Use Your Information**


We use the information we collect to:

- Provide and improve our services.
- Respond to your requests or inquiries.
- Conduct research and analysis to better understand how our services are used.
- Comply with legal requirements and protect our legal rights.

**3. How We Share Your Information**

We do not sell or share your personal information with third parties for their direct marketing purposes without your consent. We may share your information with:

- Service providers who assist us in meeting business operations needs, including hosting, delivering, and improving our services.
- Legal authorities when we believe in good faith that access, use, preservation or disclosure of the information is reasonably necessary to comply with law or court order, enforce our terms of service, or protect our rights, property or safety, or that of our users or the public.

**4. How We Protect Your Information**

We implement appropriate technical and organizational measures to protect the information we collect and store. Unfortunately, no security measures are 100% foolproof, and as such no network or system (including ours) can be guaranteed to be 100% secure against disturbances, intrusions, or unauthorized access.

**5. Cookies and Similar Technologies**

We use cookies and similar technologies to provide and support our services and each of the uses outlined and described in this policy. You have the ability to control cookies through your browser settings.

**6. Changes to This Policy**

We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date and the updated version will be effective as soon as it is accessible.

**7. Contact Us**

If you have any questions about this Privacy Policy, you can contact us at .

`}</Markdown>
      <IndexFooter />
    </main>
  );
};

export default PrivacyPolicy;
