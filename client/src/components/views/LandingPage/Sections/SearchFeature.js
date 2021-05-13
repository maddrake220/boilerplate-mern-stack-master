import React, {useState} from 'react';
import { Input } from 'antd';

const {Search} = Input
 
function SearchFeature(props) {

    const [SearchTerm, setSearchTerm] = useState("")

    const searchHandler = (event) => { /* 부모 자식 컴포넌트 프롭 이동*/
        setSearchTerm(event.currentTarget.value)
        props.refreshFunction(event.currentTarget.value)
    }
    return (
        <div>
            <Search 
                placeholder="input search text.."
                onChange={searchHandler}
                style={{ width : 200}}
                value={SearchTerm} />
        </div>
    )
}

export default SearchFeature
