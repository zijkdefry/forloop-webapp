public class App {
    public static void main(String[] args) throws Exception {
        var resources = new Item[] {
            new Item("index.html", "text/html"),
            new Item("ascript.js", "text/javascript"),
            new Item("style.css", "text/css")
        };
        
        Resources.load(resources);
        WebServer.run();
    }
}
