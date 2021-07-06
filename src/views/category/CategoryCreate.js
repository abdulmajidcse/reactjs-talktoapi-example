import { Link, useHistory } from "react-router-dom";
import { useReducer, useEffect } from "react";
import Spinner from "../../components/Spinner";
import Api from '../../config/Api';
import Swal from "sweetalert2";

export default function CategoryCreate() {
    const history = useHistory();
    // let [loading, setLoading] = useState(true);
    // let [name, setName] = useState('');
    // let [error, setError] = useState('');

    // useReducer mechanism
    const initialSate = {
        name: '',
        loading: true,
        error: '',
    };

    const init = (initialSate) => {
        return initialSate;
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'name':
                return {name: action.value, loading: false, error: ''};
            case 'loading':
                return {...state, loading: action.value};
            case 'error':
                return {...state, error: action.value};
            case 'loadingError':
                return {...state, loading: action.loading, error: action.error};
            case 'reset':
                return init(initialSate);
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialSate, init);

    useEffect(() => {
        document.title = 'New Category - React App';
        dispatch({type: 'loading', value: false});

        return () => {
            dispatch({type: 'reset'});
        };
    }, []);

    let handleChange = e => {
        dispatch({type: 'name', value: e.target.value});
    };

    let handleForm = e => {
        e.preventDefault();

        if (state.loading) return true;
        dispatch({type: 'loadingError', loading: true, error: ''});

        let data = new FormData();
        data.append('name', state.name);

        Api.post('/categories', data)
        .then((response) => {
            Swal.fire('', response.data.success, 'success');
            dispatch({type: 'loading', value: false});
            history.push('/categories');
        })
        .catch(error => {
            if (error.response) {
                dispatch({type: 'error', value: error.response.data.name[0]});
            } else {
                Swal.fire('', 'Something went wrong!', 'error');
            }
            dispatch({type: 'loading', value: false});
        });
    };

    return (
        <div className="card">
            <Spinner loading={state.loading} />
            <div className="card-header">
                <div className="d-flex justify-content-between">
                    <h4>New Category</h4>
                    <Link className="btn btn-primary" to="/categories">Category List</Link>
                </div>
            </div>
            <div className="card-body">
                <form onSubmit={handleForm}>
                    <label htmlFor="name" className="mb-2">Name</label>
                    <input type="text" id="name" name="name" className={(state.error && 'is-invalid') + ' form-control'} value={state.name} onChange={handleChange} />
                    {state.error && <div className="text-danger">{state.error}</div>}
                    <button type="submit" className="btn btn-primary mt-2">Save</button>
                </form>
            </div>
        </div>
    );
}