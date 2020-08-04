import {ToyReact, Component} from './toyReact';
class MyComponent extends Component{
    render() {
        return <div>
            <span>winter2333</span>
            <div>
                {true}
                {this.children}
            </div>
        </div>;
    }
}

let a = <MyComponent name="a" id="ida">
    <div>123</div>
</MyComponent>;
    
ToyReact.render(
    a,
    document.body
);    