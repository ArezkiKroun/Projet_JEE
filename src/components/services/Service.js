class Service{

    deleteoken = () => {
        localStorage.clear()
        navigate('/')
        this.setState({});
      };
}
export default new Service();