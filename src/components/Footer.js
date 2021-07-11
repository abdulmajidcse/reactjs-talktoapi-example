import { Container } from "react-bootstrap";

export default function Footer() {
    return (
        <div className="p-3" style={{background: 'black'}}>
            <Container>
                <div className="text-center">
                    <h4 className="text-light">Developer Blog &#10084; Abdul Majid</h4>
                </div>
            </Container>
        </div>
    );
}