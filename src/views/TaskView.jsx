import ClientView from "./ClientView";
import ModellerView from "./ModellerView";
import TesterView from "./TesterView";

const TaskView = () => {
    const role = localStorage.getItem('role');
    console.log(role);
    return (
        <div>
            {role === "client" && <ClientView />}
            {role === "modeller" && <ModellerView />}
            {role === "tester" && <TesterView />}
        </div>
    );
};

export default TaskView;
