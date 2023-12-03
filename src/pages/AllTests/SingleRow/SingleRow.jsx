

const SingleRow = (test, index) => {
    return (
        <tr>
        <th>{index}</th>
        <td>{test.name}</td>
        <td>Quality Control Specialist</td>
        <td>Littel, Schaden and Vandervort</td>
        <td>Canada</td>
        <td>12/16/2020</td>
        <td>Blue</td>
      </tr>
    );
};

export default SingleRow;