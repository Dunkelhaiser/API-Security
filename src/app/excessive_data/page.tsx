import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UpdateEmailForm from "./UpdateEmailForm";
import UserCard from "./UserCard";

const ExcessiveData = () => {
    return (
        <>
            <UserCard />
            <Card className="mx-auto mb-4 mt-6 max-w-xl">
                <CardHeader>
                    <CardTitle>Excessive Data Exposure</CardTitle>
                </CardHeader>
                <CardContent>
                    <UpdateEmailForm />
                </CardContent>
            </Card>
        </>
    );
};
export default ExcessiveData;
