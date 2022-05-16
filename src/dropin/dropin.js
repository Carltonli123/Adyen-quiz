// 0. Get clientKey
getClientKey().then(clientKey => {
    getPaymentMethods().then(async paymentMethodsResponse => {
        const cardConfiguration = {
            hasHolderName: true,
            holderNameRequired: true,
            billingAddressRequired: true, // Set to true to show the billing address input fields.
            styles: {
                base: {
                  color: "#34b4eb"
                }
            },
         };
        
        const configuration = {
            environment: 'test',
            clientKey: clientKey, // Mandatory. clientKey from Customer Area
            paymentMethodsResponse,
            paymentMethodsConfiguration: {
                card: cardConfiguration
            },
            removePaymentMethods: ['paysafecard', 'c_cash'],
            onChange: state => {
                updateStateContainer(state); // Demo purposes only
            },
            onSubmit: (state, dropin) => {
                // state.data;
                // state.isValid;
                makePayment(state.data);
            }
        };

        // 1. Create an instance of AdyenCheckout
            const checkout = await AdyenCheckout(configuration);

            // 2. Create and mount the Component
            const dropin = checkout
                .create('dropin', {
                    // Events
                    onSelect: activeComponent => {
                        if (activeComponent.state && activeComponent.state.data) updateStateContainer(activeComponent.data); // Demo purposes only
                    }
                })
                .mount('#dropin-container');

    });
});
