/* pagina per gestionar els connexions */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function GestionarConnexions() {

    return (

        <div>
            <h1>Gestionar connexions</h1>
            <p>Aquí pots gestionar els teus connexions.</p>
        </div>
    );
};