import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;

public class Resource {
    public String content;
    public String type;

    private Resource(String content, String type) {
        this.content = content;
        this.type = type;
    }
    
    private static HashMap<String, Resource> res;

    public static Resource get(String resource) {
        return res.get(resource);
    }

    public static boolean has(String resource) {
        return res.containsKey(resource);
    }

    public static void loadAll() throws IOException {
        res = new HashMap<String, Resource>();
        
        var webapp = new File("webapp");
        for (var file : webapp.listFiles()) {
            var filename = file.getName();
            var content = readFile(filename);
            var mime = mimeType(filename);

            res.put(filename, new Resource(content, mime));
        }
    }

    private static String mimeType(String filename) {
        var extension = filename.substring(filename.lastIndexOf('.') + 1);

        if (extension.equals("js")) extension = "javascript";

        return String.format("text/%s", extension);
    }
    
    private static String readFile(String resname) throws IOException {
        return Files.readString(Path.of("webapp", resname), StandardCharsets.UTF_8);
    }
}
