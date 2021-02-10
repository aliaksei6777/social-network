import React, {useState} from 'react';

export const News = () => {
    const [count, setCount] = useState(0)
    return (
        <div>
            News
            <p>Вы кликнули {count} раз(а)</p>
            <button onClick={() => setCount(count + 1)}>
                Нажми на меня
            </button>
        </div>
    );

}