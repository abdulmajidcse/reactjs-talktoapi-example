import React from 'react';

const ContextStore = React.createContext({
    loading: true,
    toggleLoading: function(value = false) {
        this.loading = value;
    }
});

export default ContextStore;