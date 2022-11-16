import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <>
            <Link to="/">
                <img
                    src="https://res.cloudinary.com/bhavana2002/image/upload/v1665043513/webplogo_hzfu11.png"
                    class="logo"
                />
            </Link>
        </>
    );
}
