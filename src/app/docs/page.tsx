import ReactSwagger from "./Swagger";
import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = async () => {
    const spec = createSwaggerSpec({
        apiFolder: "src/app/api",
        definition: {
            openapi: "3.0.0",
            info: {
                title: "API Security",
                version: "1.0",
            },
        },
    });
    return spec;
};

export default async function IndexPage() {
    const spec = await getApiDocs();
    return (
        <section className="container">
            <ReactSwagger spec={spec} />
        </section>
    );
}
