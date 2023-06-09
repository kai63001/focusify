import { useEffect, useState } from "react";
import { Client, Account, Databases, Storage } from "appwrite";

const useAppwrite = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [databases, setDatabases] = useState<Databases | null>(null);
  const [storage, setStorage] = useState<Storage | null>(null);

  useEffect(() => {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT as string) // Your API Endpoint
      .setProject(process.env.NEXT_PUBLIC_PROJECT as string);

    const account = new Account(client);
    const database = new Databases(client);
    const storage = new Storage(client);

    setClient(client);
    setAccount(account);
    setDatabases(database);
    setStorage(storage);
  }, []);

  return { client, account, databases, storage };
};

export default useAppwrite;
