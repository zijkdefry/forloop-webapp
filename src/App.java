public class App {
    public static void main(String[] args) throws Exception {
        Resource.loadAll();
        CLI.startAsync();
        WebServer.run();
    }
}
