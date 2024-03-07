import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.concurrent.locks.ReentrantLock;

public class Resource {
    public String content;
    public String type;

    private Resource(String content, String type) {
        this.content = content;
        this.type = type;
    }
    
    private static HashMap<String, Resource> res;
    private static ReentrantLock lk;

    public static Resource get(String resource) {
        lk.lock();
        try {
            if (!res.containsKey(resource))
                return null;

            return res.get(resource);
        }
        finally { lk.unlock(); }
    }

    public static void loadAll() throws IOException {
        res = new HashMap<>();
        lk = new ReentrantLock();
        loadResourceFiles();
    }

    public static void reloadAll() throws IOException {
        lk.lock();
        try {
            loadResourceFiles();
        }
        finally { lk.unlock(); }
    }

    public static void reload(String resource) throws IOException {
        lk.lock();
        try {
            var file = new File("webapp", resource);
            
            if (!file.exists()) throw new IOException("File doesn't exist");

            var content = readFile(resource);
            var mime = mimeType(resource);

            res.put(resource, new Resource(content, mime));
        }
        finally { lk.unlock(); }
    }

    private static void loadResourceFiles() throws IOException {
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
