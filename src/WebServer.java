import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.ServerSocket;

public class WebServer {
    private static String getPath(String httpRequest) {
        return httpRequest.replaceAll("GET /", "").replaceAll(" HTTP/1.1", "");
    }
    
    private static void serveNotFound(PrintStream out, String notFoundResource) {
        out.println("HTTP/1.1 404 Not Found");
        out.println("Content-Type: text");
        out.println();
        out.printf("404 Not Found: %s does not exist\n", notFoundResource);
    }

    private static void serve(String req, PrintStream out) {
        var resourceName = getPath(req);

        if (resourceName.isEmpty()) resourceName = "index.html";
        
        var resource = Resource.get(resourceName);

        if (resource == null) {
            serveNotFound(out, resourceName);
            return;
        }

        out.println("HTTP/1.1 200 OK");
        out.printf("Content-Type: %s\n", resource.type);
        out.println();
        out.println(resource.content);
    }

    private static ServerSocket server;

    public static void run() throws IOException {
        server = new ServerSocket(8080, 5);

        while (true) {
            var client = server.accept();

            var input = new BufferedReader(new InputStreamReader(client.getInputStream()));
            var request = input.readLine();

            var output = new PrintStream(client.getOutputStream());
            serve(request, output);

            output.close();
            input.close();
            client.close();
        }
    }
}
