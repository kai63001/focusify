import Markdown from "react-markdown";
import IndexNavbar from "../index/components/Navbar";
import IndexFooter from "../index/components/Footer";

const TermsOfService = () => {
  return (
    <main className="bg-[#121316] h-screen">
      <IndexNavbar />
      <div className="max-w-[1400px] w-full m-auto flex flex-col justify-between my-5">
        <h1 className="text-2xl">Terms of Service</h1>
      </div>
      <Markdown className="max-w-[1400px] w-full m-auto flex flex-col justify-between my-5 whitespace-pre-line">{`

_Last updated: 2023-06-14_

Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Focusify.io website (the "Service") operated by Focusify ("us", "we", or "our").

**1. Acceptance of Terms**

By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.

**2. Use of the Service**

You agree not to use the Service for any illegal purposes, and to comply with all regulations, policies and procedures of networks connected to the Service.

**3. Intellectual Property**

The Service and its original content, features and functionality are and will remain the exclusive property of Focusify and its licensors. The Service is protected by copyright, trademark, and other laws of both the Thailand and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Focusify.

**4. Termination**

We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including, without limitation, if you breach the Terms.

**5. Limitation of Liability**

In no event shall Focusify, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.

**6. Changes**

We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.

**7. Contact Us**

If you have any questions about these Terms, please contact us at .


`}</Markdown>
      <IndexFooter />
    </main>
  );
};

export default TermsOfService;
