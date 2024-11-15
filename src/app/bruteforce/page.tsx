import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BruteForceForm from "./BruteForceForm";

const SQLInjection = () => {
    return (
        <Card className="mx-auto mb-4 mt-6 max-w-xl">
            <CardHeader>
                <CardTitle>Bruteforce Attacks</CardTitle>
            </CardHeader>
            <CardContent>
                <BruteForceForm />
            </CardContent>
        </Card>
    );
};
export default SQLInjection;
