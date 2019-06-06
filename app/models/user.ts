export class User {
    public userName: string;
    public lastUpdated: Date;
    public profile: Profile;
}

export class Profile {
    public given_name: string;
    public family_name: string;
    public name: string;
    public unique_name: string;
    public upn: string;
    public in_corp: boolean
}