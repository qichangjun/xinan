import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, from } from 'apollo-link';
import { Router } from '@angular/router';
import { onError } from 'apollo-link-error';

// const uri = 'http://ys.free.cngrok.com/graphql';
// const uri = 'http://192.168.1.126:3000/graphql';
// const uri = 'http://192.168.1.16:5000/graphql';
const uri = 'http://192.168.1.37:5000/graphql';

@NgModule({
    imports: [
        HttpClientModule,
        ApolloModule,
        HttpLinkModule
    ],
    exports: [
        HttpClientModule,
        ApolloModule,
        HttpLinkModule
    ]
})
export class GraphQLModule {

    token = 'TOKEN';

    constructor(
        private apollo: Apollo,
        private httpLink: HttpLink,
        public router: Router
    ) {
        this.initWare();
    }

    initWare() {
        const http = this.httpLink.create({ uri });
        const authMiddleware = new ApolloLink((operation, forward) => {
            const token = localStorage.getItem('token');
            if (token) {
                operation.setContext({
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
                });
            }

            return forward(operation);
        });

        const checkCodeLink = new ApolloLink((operation, forward) => {
            return forward(operation).map((response) => {
                console.log(response.data);
                if (response.data.code) {
                    if (response.data.code === 403) {
                        console.log(response.data.code);
                    }
                    if (response.data.code === 302) {
                        console.log(response.data.code);
                        localStorage.removeItem('token');
                        // localStorage.removeItem('name');
                        this.router.navigate(['login']);
                    }
                }
                return response;
            });
        });

        const errorLink = onError(({ graphQLErrors, networkError, response }) => {
            if (graphQLErrors) {
                graphQLErrors.map(({ message, locations, path }) =>
                    console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
                );
            }

            if (networkError) {
                console.log(`[Network error]: ${networkError}`);
                console.dir(networkError);
            }
        });

        this.createApollo([authMiddleware, errorLink, checkCodeLink, http]);

    }

    createApollo(params) {
        this.apollo.create({
            link: from([...params]),
            cache: new InMemoryCache(),
            defaultOptions: {
                watchQuery: {
                    // fetchPolicy: 'network-only',
                    fetchPolicy: 'no-cache',
                    errorPolicy: 'all'
                }
            }
        });
    }

}
