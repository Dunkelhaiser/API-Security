import Link from "next/link";

const Header = () => {
    return (
        <header className="flex flex-row gap-20 border bg-card p-6 text-card-foreground shadow">
            <Link href="/excessive_data" className="font-medium">
                Excessive Data
            </Link>
            <Link href="/sql_injection" className="font-medium">
                SQL Injection
            </Link>
            <Link href="/xss" className="font-medium">
                XSS
            </Link>
            <Link href="/bruteforce" className="font-medium">
                Bruteforce
            </Link>
        </header>
    );
};
export default Header;
