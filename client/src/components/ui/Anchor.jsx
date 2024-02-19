import { Link } from 'react-router-dom';

export const Anchor = ({to, children}) => {
    <Link to={to} className=' bg-indigo-500 px-3 py-2 rounded-md'>
        {children}
    </Link>
};