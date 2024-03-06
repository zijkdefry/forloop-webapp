import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.ServerSocket;

public class WebServer {
    private static String getPath(String httpRequest) {
        return httpRequest.replaceAll("GET /", "").replaceAll(" HTTP/1.1", "");
    }

    private static void ServeNotFount(PrintStream out, String notFoundResource) {
        out.println("HTTP/1.1 404 Not Found");
        out.println("Content-Type: text");
        out.println();
        out.printf("404 Not Found: %s does not exist\n", notFoundResource);
    }

    private static void ServeClose(PrintStream out) {
        out.println("HTTP/1.1 204 No Content");
        out.println();
    }

    // Returns running state of the server
    private static boolean Serve(String req, PrintStream out) {
        var resource = getPath(req);

        if (resource.isEmpty()) resource = "index.html";

        if (resource.equals("close")) {
            ServeClose(out);
            return false;
        }

        if (!Resources.has(resource)) {
            ServeNotFount(out, resource);
            return true;
        }
        
        var item = Resources.get(resource);

        out.println("HTTP/1.1 200 OK");
        out.printf("Content-Type: %s\n", item.type);
        out.println();
        out.println(item.nameContent);
        return true;
    }

    public static void run() throws IOException {
        var server = new ServerSocket(8080, 5);
        
        var running = true;
        while (running) {
            var client = server.accept();

            var input = new BufferedReader(new InputStreamReader(client.getInputStream()));
            var req = input.readLine();

            var output = new PrintStream(client.getOutputStream());
            running = Serve(req, output);

            output.close();
            input.close();
            client.close();
        }

        server.close();
    }
}
