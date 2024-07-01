//Db types Entities

interface PubImage {
  PublicationDay: number;
  Name: string;
}

interface Publication {
  Day: number;
  Message: string;
}

type FullPublication = {
  found: boolean;
  day: number;
  message: string;
  imgs: PubImage[];
};
