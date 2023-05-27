import { useEffect, useState } from "react";
import { Client, Account, Databases } from "appwrite";

const useAppwrite = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [databases, setDatabases] = useState<Databases | null>(null);

  useEffect(() => {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT as string) // Your API Endpoint
      .setProject(process.env.NEXT_PUBLIC_PROJECT as string);

    const account = new Account(client);
    const database = new Databases(client);

    setClient(client);
    setAccount(account);
    setDatabases(database);
  }, []);

  return { client, account, databases };
};

export default useAppwrite;