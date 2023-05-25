import { useEffect, useState } from "react";
import { Client, Account } from "appwrite";

const useAppwrite = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT as string) // Your API Endpoint
      .setProject(process.env.NEXT_PUBLIC_PROJECT as string);

    const account = new Account(client);

    setClient(client);
    setAccount(account);
  }, []);

  return { client, account };
};

export default useAppwrite;