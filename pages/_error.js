import {Button, Result} from "antd";
import Link from "next/link";

const ExtraComponent = () => (
    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
        <Link href='/'><Button>Go Home</Button></Link>
    </div>
)

export default () => (
    <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<ExtraComponent/>}
    />
)
