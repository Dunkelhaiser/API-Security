import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SQLInjectionForm from "./SQLInjectionForm";

const SQLInjection = () => {
    return (
        <Card className="mx-auto mb-4 mt-6 max-w-xl">
            <CardHeader>
                <CardTitle>SQL Injection</CardTitle>
            </CardHeader>
            <CardContent>
                <SQLInjectionForm />
            </CardContent>
        </Card>
    );
};
export default SQLInjection;
