const socketUrl = process.env.REACT_APP_STAGE === 'prod' ? '/' : 'http://localhost:4000';
export default socketUrl;