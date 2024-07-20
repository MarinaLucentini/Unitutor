package marinalucentini.Unitutor.community.services;

import marinalucentini.Unitutor.community.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
    @Autowired
    CommentRepository commentRepository;
}
