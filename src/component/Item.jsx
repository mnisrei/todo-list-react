const Item = (props) => {
    return (
        <div className="eachItem">
            <h3 >{props.item}</h3>
            <i className="far fa-trash-alt add-btn" title="Delete Items" />
        </div>
    );
}

export default Item;