import React from 'react';
import useClickOutside from "../../hooks/useClickOutside";

const SizeHelper = (props) => {
    const node = useClickOutside(()=>{
        props.setVisibility(false)
    })
    return (
        <div ref={node} style={{position:"absolute"}}>
            <h2>Pomoc s velikostmi</h2>
            <div>
                <h3>Trička</h3>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>XS</th>
                        <th>S</th>
                        <th>M</th>
                        <th>L</th>
                        <th>XL</th>
                        <th>XXL</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>EUR</td>
                        <td>35/36</td>
                        <td>37/38</td>
                        <td>39/40</td>
                        <td>41/42</td>
                        <td>43/44</td>
                        <td>45/46</td>
                    </tr>
                    <tr>
                        <td>Prsa cm</td>
                        <td>80-84</td>
                        <td>88-92</td>
                        <td>96-100</td>
                        <td>104-108</td>
                        <td>112-116</td>
                        <td>120-124</td>
                    </tr>
                    <tr>
                        <td>Pas cm</td>
                        <td>68-72</td>
                        <td>76-80</td>
                        <td>84-88</td>
                        <td>92-96</td>
                        <td>100-104</td>
                        <td>108-112</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <button onClick={()=>{
                props.setVisibility(false)
            }}>Zavřít</button>
        </div>
    );
};

export default SizeHelper;