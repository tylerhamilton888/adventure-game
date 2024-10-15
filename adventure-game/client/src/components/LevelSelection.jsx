import React from 'react';
import { Link } from 'react-router-dom';

export default function LevelSelection() {
    return (
        <div>
            <h2>Level Selection</h2>
            <ul>
                <li>
                    <Link to="/level-one/intro">Level 1 - The Beginning of Your Adventure</Link>
                </li>
            </ul>
        </div>
    );
}
