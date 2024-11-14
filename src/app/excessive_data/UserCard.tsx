"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

const UserCard = () => {
    const { data } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await fetch("/api/get_user");
            const data = await res.json();
            return data;
        },
    });

    return (
        <Card className="mx-auto mt-6 max-w-xl">
            <CardHeader>
                <p className="font-medium">{data?.name}</p>
                <p className="text-sm">{data?.email}</p>
            </CardHeader>
        </Card>
    );
};
export default UserCard;
